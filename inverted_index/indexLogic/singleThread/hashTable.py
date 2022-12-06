class Node:
    def __init__(self, key, value, next_node):
        self.key = key
        self.value = value
        self.next = next_node


class OpenAddressing:
    def __init__(self, initial_capacity):
        self.capacity = initial_capacity
        self.keys = [None] * initial_capacity
        self.values = [None] * initial_capacity
        self.size = 0
        self.max_size = 20000000

    def find_index(self, string):
        return self.string_hash(string) % self.capacity

    @staticmethod
    def is_int(s):
        if type(s) == int:
            return True
        if type(s) != str:
            return False

    def string_hash(self, string):
        hash_key = 0
        if self.is_int(string):
            return string % self.capacity
        for character in string:
            hash_key = ord(character) + (31 * hash_key)
        return hash_key

    def __len__(self):
        return self.size

    def resize(self):
        new_capacity = self.capacity * 2
        if new_capacity > self.max_size:
            new_capacity = self.max_size
        old_keys = self.keys
        old_values = self.values
        self.keys = [None] * new_capacity
        self.values = [None] * new_capacity
        self.capacity = new_capacity
        self.size = 0
        for (key, value) in zip(old_keys, old_values):
            if type(key) == str and key is not None:
                self.__setitem__(key, value)
            if type(key) == int and key is not None:
                self.__setitem__(key, object())

    def __setitem__(self, key, value):
        if self.size > int(self.capacity * 0.8):
            self.resize()
            self.__setitem__(key, value)
        else:
            hash_key = self.find_index(key)
            while self.keys[hash_key] is not None:
                if self.keys[hash_key] == key:
                    break
                hash_key = (hash_key + 1) % self.capacity
            self.keys[hash_key] = key
            self.values[hash_key] = value
            self.size += 1

    def __getitem__(self, key):
        hash_key = self.find_index(key)
        while self.keys[hash_key] is not None:
            if self.keys[hash_key] == key:
                return self.values[hash_key]
            hash_key = (hash_key + 1) % self.capacity
        raise KeyError

    def getitem(self, key, default=None):
        i = self.find(key)
        if self.values[i] is not None:
            return self.values[i]
        elif default is None:
            return None
        else:
            new_default = default()
            self.insert(key, new_default, i)
            return new_default

    def insert(self, key, value, hash_key=None):
        if self.size > int(self.capacity * 0.8):
            self.resize()
            hash_key = None
        if hash_key is None:
            self.__setitem__(key, value)
        else:
            while self.keys[hash_key] is not None:
                if self.keys[hash_key] == key:
                    break
                hash_key = (hash_key + 1) % self.capacity
            self.keys[hash_key] = key
            self.values[hash_key] = value
            self.size += 1

    def find(self, key):
        hash_key = self.find_index(key)
        while self.keys[hash_key] is not None:
            if self.keys[hash_key] == key:
                return hash_key
            hash_key = (hash_key + 1) % self.capacity
        return hash_key


class HashSet:
    def __init__(self):
        self.hash_table = OpenAddressing(10)
        self.present = object()

    def add(self, value):
        if self.__contains__(value):
            self.hash_table[value] = self.present
            return 0
        else:
            self.hash_table[value] = self.present
            return 1

    def __contains__(self, value):
        try:
            _ = self.hash_table[value]
            return True
        except KeyError:
            return False