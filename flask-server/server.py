from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route("/get_recommondation", methods=["POST"])
def get_recommendations():
    request_data = request.json
    recipe_id = request_data.get('recipeId')
    recipes_data = request_data.get('recipes')
    # print("recipe_id", recipe_id)
    # print("recipes_data", recipes_data)
    Recomendate(recipes_data)
    recipes_dict = pickle.load(open('recipe_dict.pkl', 'rb'))
    similarity = pickle.load(open("similarity.pkl", 'rb'))
    recipes_df = pd.DataFrame(recipes_dict)

    recipeIds  = []
    # print(recipe_id)

    def recommend(recipe_id):
        recipe_index = recipes_df[recipes_df["_id"] == recipe_id].index[0]
        distances = similarity[recipe_index]
        movies_lists = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])[1: 7]
        for i in movies_lists:
           recipeIds.append(recipes_df.iloc[i[0]]._id)
        return recipeIds
    recommendations = recommend(recipe_id)
    return jsonify({"recommendations": recommendations})


def Recomendate(recipes_data):

    recipes_df = pd.DataFrame(recipes_data)
    recipes_df = recipes_df.drop(columns=["image", "owner", "__v", "createdAt", "updatedAt", "updatedAT", "favorites"])
    print("Dropped")
    # print(recipes_df.isnull().sum())

    def convert(obj):
        L = []
        for i in obj:
            L.append(i['ingredient_name'])
        return L

    recipes_df['ingredients'] = recipes_df['ingredients'].apply(convert)

    recipes_df["description"] = recipes_df["description"].apply(lambda x: x.split())
    # recipes_df["description"] = recipes_df["description"].apply(lambda x: [i.replace(" ", "") for i in x])
    recipes_df["ingredients"] = recipes_df["ingredients"].apply(lambda x: [i.replace(" ", "") for i in x])
    recipes_df["category"] = recipes_df["category"].apply(lambda x: x.replace(" ", ""))
    recipes_df["dishType"] = recipes_df["dishType"].apply(lambda x: x.replace(" ", ""))
    # print("just tags")
    recipes_df["tags"] = (recipes_df["title"] + " " + 
                   recipes_df["description"].apply(lambda x: ' '.join(x)) + " " + 
                   recipes_df["ingredients"].apply(lambda x: ' '.join(x)) + " " + 
                   (recipes_df["dishType"] + " ") * 20+
                   (recipes_df["category"] + " ") * 6 + 
                   (recipes_df["vegNonVeg"] + " ") * 10 +
                   recipes_df["vegNonVeg"] + " " + 
                   recipes_df["dishType"] + " " + 
                   recipes_df["category"])
    # print("before tags")
    recipes_df["tags"] = recipes_df["tags"].apply(lambda x: x.lower())  # Corrected this line

    recipes_df.drop(columns=["title", "description", "ingredients", "vegNonVeg", "dishType", "category"], inplace=True)
    # print("tags added")

    ps = PorterStemmer()

    def stem(text):
        y = []
        for i in text.split():
            y.append(ps.stem(i))
        return " ".join(y)
    
    recipes_df["tags"] = recipes_df["tags"].apply(stem)

    cv = CountVectorizer(max_features=5000, stop_words='english')
    vectors = cv.fit_transform(recipes_df['tags']).toarray()
    # print(vectors)
    similarity = cosine_similarity(vectors)
    print("similarity")
    print("recipes_df.to_dict()")
    pickle.dump(recipes_df.to_dict(), open('recipe_dict.pkl', 'wb'))
    pickle.dump(similarity, open("similarity.pkl", 'wb'))
    return {"message": "Successfully created cosine similarity"}

if __name__ == "__main__":
    app.run(debug=True)
