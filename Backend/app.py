from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

products = [
    {
        "id": 1,
        "name": "Chopping Board",
        "price": 360,
        "description": "A durable wooden chopping board for daily kitchen use.",
        "image": "https://bit.ly/3XCmlH5",
    },
    {
        "id": 2,
        "name": "Sketch Pens",
        "price": 30,
        "description": "12 bright colors perfect for school and art projects.",
        "image": "https://bit.ly/3X8Tb2d",
    },
    {
        "id": 3,
        "name": "Shoes",
        "price": 519,
        "description": "Comfortable running shoes with breathable mesh.",
        "image": "https://bit.ly/4r5FnTX",
    },
    {
        "id": 4,
        "name": "Water Bottle",
        "price": 199,
        "description": "1-litre stainless steel insulated bottle.",
        "image": "https://bit.ly/48oQWy3",
    },
    {
        "id": 5,
        "name": "Notebook",
        "price": 85,
        "description": "200-page ruled notebook for study & office use.",
        "image": "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
    },
    {
        "id": 6,
        "name": "Earphones",
        "price": 299,
        "description": "High-quality wired earphones with mic.",
        "image": "https://bit.ly/4i705i2",
    },
    {
        "id": 7,
        "name": "Backpack",
        "price": 899,
        "description": "Lightweight waterproof backpack with 3 compartments.",
        "image": "https://bit.ly/4ocvZuZ",
    },
    {
        "id": 8,
        "name": "LED Bulb",
        "price": 120,
        "description": "9W energy-efficient LED bulb.",
        "image": "https://bit.ly/49oKyI9",
    },
    {
        "id": 9,
        "name": "Coffee Mug",
        "price": 250,
        "description": "Ceramic mug with heat insulation and stylish print.",
        "image": "https://bit.ly/48uDdov",
    },
    {
        "id": 10,
        "name": "Keyboard",
        "price": 750,
        "description": "USB keyboard with smooth keys and long durability.",
        "image": "https://bit.ly/3X6DtEU",
    },
]


def get_next_id():
    return max([p["id"] for p in products], default=0) + 1


# Home
@app.route("/")
def home():
    return jsonify({"message": "Simple Products REST API"})


# GET ALL PRODUCTS
@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)


# GET SINGLE PRODUCT
@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    for product in products:
        if product["id"] == product_id:
            return jsonify(product)
    return jsonify({"error": "Product not found"}), 404


# CREATE PRODUCT
@app.route("/products", methods=["POST"])
def create_product():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid data"}), 400

    new_product = {
        "id": get_next_id(),
        "name": data.get("name"),
        "price": data.get("price"),
        "description": data.get("description"),
        "image": data.get("image"),
    }

    products.append(new_product)
    return jsonify(new_product), 201


# UPDATE PRODUCT
@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()

    for product in products:
        if product["id"] == product_id:
            product["name"] = data.get("name", product["name"])
            product["price"] = data.get("price", product["price"])
            product["description"] = data.get("description", product["description"])
            product["image"] = data.get("image", product["image"])
            return jsonify(product)

    return jsonify({"error": "Product not found"}), 404


# DELETE PRODUCT
@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    global products
    products = [p for p in products if p["id"] != product_id]
    return jsonify({"message": "Product deleted"})


if __name__ == "__main__":
    app.run(debug=True)
