from indexLogic.singleThread.invertedIndex import InvertedIndex
from indexLogic.singleThread.hashTable import OpenAddressing
from indexLogic.multiThread.invertedIndexMulti import InvertedIndexMulti
from indexLogic.multiThread.hashTableMulti import OpenAddressingMulti
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/health/ping')
def ping():
    return jsonify({'data': {'success': True, 'result': 'pong'}, 'status': 200})


@app.route('/add-to-table-single', methods=['POST'])
def add_value_to_index_single():
    data = request.get_json()
    try:
        result_time = index.index_doc(data['doc_data'], data['doc_id'])
        return jsonify({
            'data': {
                'success': True,
                'result_time': result_time[0],
                'threadMulti': 0,
                'words_added': result_time[1]
            }})
    except Exception as e:
        return jsonify({'data': {'success': False, 'error': e}, 'status': 500})


@app.route('/search-single', methods=['GET'])
def search_in_index_single():
    try:
        search = request.args.get('search')
        result = index.search(search)
        return jsonify({'data': {'result': result[0], 'result_time': result[1], 'threadMulti': 0}})
    except Exception as e:
        return jsonify({'data': {'success': False, 'error': e}, 'status': 500})


@app.route('/search-multi', methods=['GET'])
def search_in_index_multi():
    try:
        search = request.args.get('search')
        max_workers = int(request.args.get('maxWorkers'))
        result = index_multi.search(search, max_workers)
        return jsonify({'data': {'result': result[0], 'result_time': result[1], 'threadMulti': 1, 'max_workers': max_workers}})
    except Exception as e:
        return jsonify({'data': {'success': False, 'error': e}, 'status': 500})


@app.route('/add-to-table-multi', methods=['POST'])
def add_value_to_index_multi():
    data = request.get_json()
    try:
        result_time = index_multi.index_doc_pool_handle(data['doc_data'], data['doc_id'], int(data['maxWorkers']))
        return jsonify({
                'data': {
                    'success': True,
                    'result_time': result_time[0],
                    'threadMulti': 1,
                    'max_workers': data['maxWorkers'],
                    'words_added': result_time[1]
                }})
    except Exception as e:
        return jsonify({'data': {'success': False, 'error': e}, 'status': 500})


if __name__ == '__main__':
    initial_size = 5
    hash_table = OpenAddressing(initial_capacity=initial_size * 5)
    index = InvertedIndex(hash_table)

    hash_table_multi = OpenAddressingMulti(initial_size * 5)
    index_multi = InvertedIndexMulti(hash_table_multi)
    app.run(host='0.0.0.0', port=5050)
