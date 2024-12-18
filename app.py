from flask import Flask, render_template, request, jsonify, abort
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Superpie1@'
app.config['MYSQL_DB'] = 'PartsAndSuppliers'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/insert', methods=['POST'])
def insert_shipment():
    data = request.get_json()

    shipment_data = (
        data.get('sno'),
        data.get('pno'),
        data.get('qty'),
        data.get('price')
    )

    insert_statement = """
        INSERT INTO SHIPMENT(Sno, Pno, Qty, Price) 
        VALUES (%s, %s, %s, %s)
    """
    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute(insert_statement, shipment_data)
            cursor.connection.commit()
            return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/increase', methods=['POST'])
def increase_shipment():
    data = request.get_json()
    sno = [data.get('sno')]
    increase_statement = """
        UPDATE SUPPLIER SET Status=Status*1.1
        WHERE Sno LIKE %s
    """
    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute(increase_statement, sno)
            cursor.connection.commit()
            return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/display-all', methods=['GET'])
def display_all():
    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute('SELECT * FROM SUPPLIER')
            suppliers = cursor.fetchall()
            return jsonify({'status': 'success', 'suppliers': suppliers})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/supplier', methods=['POST'])
def get_supplier():
    data = request.get_json()
    pno = [data.get('pno')]

    query_statement = """
        SELECT S1.* FROM SUPPLIER S1
        JOIN SHIPMENT S2 ON S1.Sno = S2.Sno
        WHERE S2.Pno = %s
        """

    try:
        with mysql.connection.cursor() as cursor:
            cursor.execute(query_statement,pno)
            supplier = cursor.fetchall()
            print(supplier)
            return jsonify({'status': 'success', 'suppliers': supplier})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/')
def hello_world():  # put application's code here
    with mysql.connection.cursor() as cursor:
        cursor.execute('SELECT Sno FROM SUPPLIER')
        suppliers = [row[0] for row in cursor.fetchall()]
    return render_template('index.html', suppliers=suppliers)
