import multiprocessing
import re
import timeit
from indexLogic.multiThread.hashTableMulti import HashSet
from concurrent.futures.thread import ThreadPoolExecutor


class InvertedIndexMulti:
    def __init__(self, hash_table):
        self.hash_table = hash_table
        self.words = 0

    def index_doc(self, word, doc_id):
        try:
            self.words += self.hash_table.getitem(word, HashSet).add(doc_id)
            return self.words
        except TypeError as e:
            print(e)

    def index_doc_pool_handle(self, document, doc_id, max_workers):
        start = timeit.default_timer()
        words_parsed = re.split(r' ', document)
        words_unique = list(set(words_parsed))
        try:
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                words_normalized = executor.map(lambda w: w.lower(), words_unique)
                futures = [executor.submit(self.index_doc, word=word, doc_id=doc_id) for word in words_normalized]
                for f in futures:
                    print(f.result(timeout=0.5))
                executor.shutdown(wait=True)
        except Exception as e:
            print(e)

        end = timeit.default_timer()
        return end-start, self.words

    def search(self, query, max_workers):
        start = timeit.default_timer()
        try:
            result = self.hash_table.get_item_caller(query)
        except KeyError:
            end = timeit.default_timer()
            return [], end - start

        temp = result.hash_set_table.keys
        answer = set()

        try:
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                executor.map(lambda t: answer.add(t) if t is not None else None, temp)
                executor.shutdown(wait=True)
        except Exception as e:
            print(e)

        end = timeit.default_timer()
        return list(answer), end - start

    def get_average_doc_per_key(self):
        words = self.words
        len = self.hash_table.__len__()
        result = round(words / len, 0)
        result = int(result)
        return result


# if __name__ == '__main__':
#
#     num_documents = int(input().strip())
#     documents = ['content second']
#     queries = ['content', 'second']
#
#     hash_table_multi = OpenAddressingMulti(4)
#     index = InvertedIndexMulti(hash_table_multi)
#
#     for g in range(len(documents)):
#         index.index_doc_pool_handle(documents[g], g)
#
#
#     for g in range(len(documents)):
#         index.index_doc_pool_handle(documents[g], g)
#
#     for g in range(len(queries)):
#         print(index.search(queries[g]))
#     print(index.get_average_doc_per_key())
