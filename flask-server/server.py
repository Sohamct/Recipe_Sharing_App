from flask import Flask, request, jsonify
from flask_cors import CORS
import json
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
                   (recipes_df["category"] + " ") * 40 + 
                   (recipes_df["vegNonVeg"] + " ") * 1 +
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

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import json
# import pickle
# import pandas as pd
# from sklearn.feature_extraction.text import CountVectorizer
# from nltk.stem.porter import PorterStemmer
# from sklearn.metrics.pairwise import cosine_similarity
# from pymongo import MongoClient


# app = Flask(__name__)
# CORS(app, origins='http://localhost:3000')


# @app.route("/get_recommondation", methods=["GET"])
# def get_recommendations():
#     recipe_id = request.args.get('recipeId')

#     print("get_recipes", recipe_id)
#     Recomendate()  # Recompute data if collection has changed

#     # Load precomputed data
#     recipes_dict = pickle.load(open('recipe_dict.pkl', 'rb'))
#     similarity = pickle.load(open("similarity.pkl", 'rb'))
#     recipes_df = pd.DataFrame(recipes_dict)

#     recipeIds  = []

#     def recommend(recipe_id):
#         recipe_index = recipes_df[recipes_df["_id"] == recipe_id].index[0]
#         distances = similarity[recipe_index]
#         movies_lists = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])[1: 7]
#         for i in movies_lists:
#            recipeIds.append(recipes_df.iloc[i[0]]._id)
#         return recipeIds

#     recommendations = recommend(recipe_id)
#     return jsonify({"recommendations": recommendations})

# @app.route('/addRecipe', methods=["post"])
# def add_recipe():
#     data = request.json
#     new_recipe = data["recipe"]
#     # print(new_recipe)
#     recipes = load_recipes()

#     recipes.append(new_recipe)

#     with open('recipes.json', 'w', encoding='utf-8') as f:
#         json.dump(recipes, f, indent=4)
#     # print("Added successfully.....................")
#     Recomendate()
#     return {"message" : "Recipe added successfully"}
# 0
# @app.route('/updateRecipe', methods=["PUT"])
# def update_recipe():
#     data = request.json
#     update_recipe = data["recipe"]

#     recipes = load_recipes()

#     for i, recipe in enumerate(recipes):
#         if recipe["_id"] == update_recipe["_id"]:
#             recipes[i] = update_recipe
#             break
#     with open("recipes.json", 'w', encoding='utf=8') as f:
#         json.dump(recipes, f, indent=4)
#     Recomendate()
#     return {"message" : "Recipe updated successfully"}



# @app.route('/deleteRecipe', methods=["DELETE"])
# def delete_recipe():
#     recipe_id = request.args.get('recipeId')
#     print("Deleting: ", recipe_id)

#     with open('recipes.json', 'r') as json_file:
#         try:
#             recipes_data = json.load(json_file)
#         except json.JSONDecodeError as e:
#             print("JSON decoding error:", e)
#     # if recipe_id in recipes_data:
#     #     del recipes_data[recipe_id]
#     found = False
#     for recipe in recipes_data:
#         if recipe.get('_id') == recipe_id:
#             recipes_data.remove(recipe)
#             found = True
#             break
#     if found:
#         with open('recipes.json', 'w') as json_file:
#             json.dump(recipes_data, json_file, indent=4)
#         Recomendate()
#         return jsonify({"message" : f"Recipe {recipe_id} deleted successfully"})
#     else:
#         return jsonify({"error" : f"Recipe {recipe_id} not found"}), 404


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
 