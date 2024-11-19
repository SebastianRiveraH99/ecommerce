from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

# Configuración de la base de datos
db_config = {
    "host": "localhost",
    "port": 3307,
    "user": "root",
    "password": "",
    "database": "ecommerce"
}

def conectar_db():
    return mysql.connector.connect(**db_config)

# Ruta de prueba
@app.route('/hola')
def home():
    return jsonify({"message": "Bienvenido a la API de e-commerce"})

# CRUD para productos
@app.route('/products', methods=['GET', 'POST'])
def products():
    conexion = conectar_db()
    cursor = conexion.cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        conexion.close()
        return jsonify(products)

    if request.method == 'POST':
        data = request.json
        query = """
            INSERT INTO products (name, description, price, stock)
            VALUES (%s, %s, %s, %s)
        """
        values = (data['name'], data['description'], data['price'], data['stock'])
        cursor.execute(query, values)
        conexion.commit()
        conexion.close()
        return jsonify({"message": "Product added"}), 201

# Continúa con las demás rutas...

if __name__ == '__main__':
    app.run(debug=True)


# CRUD para usuarios
@app.route('/users', methods=['POST'])
def create_user():
    conexion = conectar_db()
    cursor = conexion.cursor()

    data = request.json
    query = """
        INSERT INTO users (name, email, password)
        VALUES (%s, %s, %s)
    """
    values = (data['name'], data['email'], data['password'])
    cursor.execute(query, values)
    conexion.commit()
    conexion.close()
    return jsonify({"message": "User created"}), 201

# Crear una orden
@app.route('/orders', methods=['POST'])
def create_order():
    conexion = conectar_db()
    cursor = conexion.cursor()

    data = request.json
    query_order = """
        INSERT INTO orders (user_id, total_amount, status)
        VALUES (%s, %s, %s)
    """
    values_order = (data['user_id'], data['total_amount'], data['status'])
    cursor.execute(query_order, values_order)
    order_id = cursor.lastrowid

    # Agregar los items de la orden
    query_items = """
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (%s, %s, %s, %s)
    """
    for item in data['items']:
        values_items = (order_id, item['product_id'], item['quantity'], item['price'])
        cursor.execute(query_items, values_items)

    conexion.commit()
    conexion.close()
    return jsonify({"message": "Order created", "order_id": order_id}), 201

# Obtener detalles de una orden
@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    conexion = conectar_db()
    cursor = conexion.cursor(dictionary=True)

    # Obtener datos de la orden
    cursor.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
    order = cursor.fetchone()

    if not order:
        conexion.close()
        return jsonify({"message": "Order not found"}), 404

    # Obtener los items de la orden
    cursor.execute("SELECT * FROM order_items WHERE order_id = %s", (order_id,))
    items = cursor.fetchall()

    conexion.close()
    order['items'] = items
    return jsonify(order)


if __name__ == '__main__':
    app.run(debug=True)


