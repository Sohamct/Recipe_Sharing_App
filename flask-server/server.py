from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

@app.route("/get_recommondation", methods=["post"])
def get_recommendations():
    recipes_dict = pickle.load(open('recipe_dict.pkl', 'rb'))
    similarity = pickle.load(open("similarity.pkl", 'rb'))
    recipes_df = pd.DataFrame(recipes_dict)

    print("RRRRRRRRRRRRRRRRRRRRRRR", recipes_df)
    data = request.json
    recipe_id = data.get('recipeId')
    recipeIds  = []
    print(recipe_id)

    def recommend(recipe_id):
        recipe_index = recipes_df[recipes_df["_id"] == recipe_id].index[0]
        distances = similarity[recipe_index]
        movies_lists = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])[1: 7]
        for i in movies_lists:
           recipeIds.append(recipes_df.iloc[i[0]]._id)
        return recipeIds
    recomondations = recommend(recipe_id)
    return jsonify({"recomondations": recomondations})

# @app.route("/recommend", methods=["POST"])
# def Recomendate():
#     data = request.json

#     recipes = data["recipes"]
#     # print(recipes)

#     json_file_path = "recipes.json"

#     with open(json_file_path, mode="w", encoding="utf-8") as json_file:
#         json.dump(recipes, json_file, indent=4)
    
#     recipes_df = pd.read_json("recipes.json")
#     recipes_df = recipes_df.drop(columns=["image", "owner", "__v", "createdAt", "updatedAt", "updatedAT"])

#     recipes_df["favorites"] = recipes_df["favorites"].apply(lambda x: len(x))
#     print(recipes_df.isnull().sum())

#     def convert(obj):
#         L = []
#         for i in obj:
#             L.append(i['ingredient_name'])
#         return L

#     recipes_df['ingredients'] = recipes_df['ingredients'].apply(convert)

#     recipes_df["ingredients"] = recipes_df["ingredients"].apply(lambda x: [i.replace(" ", "") for i in x])
#     recipes_df["category"] = recipes_df["category"].apply(lambda x: x.replace(" ", ""))
#     recipes_df["dishType"] = recipes_df["dishType"].apply(lambda x: x.replace(" ", ""))

#     recipes_df["tags"] = (recipes_df["title"] + " " + 
#                    recipes_df["ingredients"].apply(lambda x: ' '.join(x)) + " " + 
#                    recipes_df["vegNonVeg"] + " " + 
#                    recipes_df["dishType"] + " " + 
#                    recipes_df["category"])
    
#     recipes_df["tags"] = recipes_df["tags"].apply(lambda x: x.lower())  # Corrected this line
#     print(recipes_df["tags"])

#     recipes_df.drop(columns=["title", "description", "ingredients", "vegNonVeg", "dishType", "category", "favorites"], inplace=True)
#     # recipes_df["tags"] = recipes_df["tags"].astype(str)
#     # recipes_df = recipes_df[~recipes_df["tags"].str.contains(r'[^\W\d]', regex=True)]

#     # Check if DataFrame is empty after filtering
#     if recipes_df.empty:
#         return {"error": "No valid recipes found to recommend"}

#     cv = CountVectorizer(max_features=5000, stop_words='english')
#     vectors = cv.fit_transform(recipes_df['tags']).toarray()

#     ps = PorterStemmer()

#     def stem(text):
#         y = []
#         for i in text.split():
#             y.append(ps.stem(i))
#         return " ".join(y)
    
#     recipes_df["tags"] = recipes_df["tags"].apply(stem)

#     cv = CountVectorizer(max_features=5000, stop_words='english')
#     vectors = cv.fit_transform(recipes_df['tags']).toarray()
#     similarity = cosine_similarity(vectors)
#     pickle.dump(recipes_df.to_dict(), open('recipe_dict.pkl', 'wb'))
#     pickle.dump(similarity, open("similarity.pkl", 'wb'))
#     return {"message": "Successfully created cosine similarity"}

# if __name__ == "__main__":
#     app.run(debug=True)


@app.route("/recommend", methods=["POST"])
def Recomendate():
    data = request.json

    recipes = data["recipes"]
    print(recipes)

    json_file_path = "recipes.json"

    with open(json_file_path, mode="w", encoding="utf-8") as json_file:
        json.dump(recipes, json_file, indent=4)
    
    recipes_df = pd.read_json("recipes.json")
    recipes_df = recipes_df.drop(columns=["image", "owner", "__v", "createdAt", "updatedAt", "updatedAT"])

    recipes_df["favorites"] = recipes_df["favorites"].apply(lambda x: len(x))
    print(recipes_df.isnull().sum())

    def convert(obj):
        L = []
        for i in obj:
            L.append(i['ingredient_name'])
        return L

    recipes_df['ingredients'] = recipes_df['ingredients'].apply(convert)

    recipes_df["description"] = recipes_df["description"].apply(lambda x: x.split())
    recipes_df["description"] = recipes_df["description"].apply(lambda x: [i.replace(" ", "") for i in x])
    recipes_df["ingredients"] = recipes_df["ingredients"].apply(lambda x: [i.replace(" ", "") for i in x])
    recipes_df["category"] = recipes_df["category"].apply(lambda x: x.replace(" ", ""))
    recipes_df["dishType"] = recipes_df["dishType"].apply(lambda x: x.replace(" ", ""))

    recipes_df["tags"] = (recipes_df["title"] + " " + 
                   recipes_df["description"].apply(lambda x: ' '.join(x)) + " " + 
                   recipes_df["vegNonVeg"] + " " + 
                   recipes_df["dishType"] + " " + 
                   recipes_df["category"])
    
    recipes_df["tags"] = recipes_df["tags"].apply(lambda x: x.lower())  # Corrected this line

    recipes_df.drop(columns=["title", "description", "ingredients", "vegNonVeg", "dishType", "category", "favorites"], inplace=True)
    # recipes_df["tags"] = recipes_df["tags"].astype(str)
    # recipes_df = recipes_df[~recipes_df["tags"].str.contains(r'[^\W\d]', regex=True)]
    cv = CountVectorizer(max_features=5000, stop_words='english')
    vectors = cv.fit_transform(recipes_df['tags']).toarray()

    ps = PorterStemmer()

    def stem(text):
        y = []
        for i in text.split():
            y.append(ps.stem(i))
        return " ".join(y)
    
    recipes_df["tags"] = recipes_df["tags"].apply(stem)

    cv = CountVectorizer(max_features=5000, stop_words='english')
    vectors = cv.fit_transform(recipes_df['tags']).toarray()
    similarity = cosine_similarity(vectors)
    pickle.dump(recipes_df.to_dict(), open('recipe_dict.pkl', 'wb'))
    pickle.dump(similarity, open("similarity.pkl", 'wb'))
    return {"message": "Successfully created cosine similarity"}

if __name__ == "__main__":
    app.run(debug=True)
