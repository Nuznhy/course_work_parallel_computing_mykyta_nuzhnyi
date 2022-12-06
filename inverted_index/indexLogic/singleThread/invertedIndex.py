import re
import timeit

from indexLogic.singleThread.hashTable import HashSet


class InvertedIndex:
    def __init__(self, hash_table):
        self.hash_table = hash_table
        self.words = 0

    def parsing(self, text):
        word_list = re.split(r' ', text)
        return word_list

    def words_normie(self, words):
        normalized_words = []
        for word in words:
            word_normie = word.lower()
            normalized_words.append(word_normie)
        return normalized_words

    def word_parsing(self, text):
        words = self.parsing(text)
        words = self.words_normie(words)
        return words

    def index_doc(self, document, doc_id):
        start = timeit.default_timer()
        words = self.word_parsing(document)
        words_unique = list(set(words))
        for i in range(len(words_unique)):
            self.words += self.hash_table.getitem(words_unique[i], HashSet).add(doc_id)
        end = timeit.default_timer()
        return end-start, self.words

    def search(self, query):
        start = timeit.default_timer()
        try:
            result = self.hash_table.__getitem__(query)
        except KeyError:
            end = timeit.default_timer()
            return [], end - start
        temp = result.hash_table.keys
        answer = []
        for i in range(len(temp)):
            if temp[i] is not None:
                answer.append(temp[i])
        end = timeit.default_timer()
        return answer, end - start

    def get_average_doc_per_key(self):
        words = self.words
        len = self.hash_table.__len__()
        result = round(words / len, 0)
        result = int(result)
        return result

#
# num_documents = int(input().strip())
# documents = []
# i = 0
# while i < num_documents:
#     documents_item = input()
#     documents.append(documents_item)
#     i += 1
#
# num_queries = int(input().strip())
# queries = []
# for _ in range(num_queries):
#     queries_item = input()
#     queries.append(queries_item)

# index = InvertedIndex(hash_table)

# for g in range(num_documents):
#     index.index_doc(documents[g], g)
#
# for g in range(num_queries):
#     index.search(queries[g])
#
# print(index.get_average_doc_per_key())
