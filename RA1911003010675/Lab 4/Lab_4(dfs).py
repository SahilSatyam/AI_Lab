# Lexographical Sorting
# A class to store a Trie node
class Trie:
    def __init__(self):
        self.key = None
 
        # Trie supports lowercase English characters `a – z`.
        # So, the character size is 26.
        self.character = [None] * 26
 
 
# Iterative function to insert a string into a Trie
def insert(head, s):
 
    # start from the root node
    curr = head
 
    for c in s:
        key = ord(c) - ord('a')
 
        # create a new node if the path doesn't exist
        if curr.character[key] is None:
            curr.character[key] = Trie()
 
        # go to the next node
        curr = curr.character[key]
 
    # store key in the leaf node
    curr.key = s
 
 
# Function to perform preorder traversal on a given Trie
def preorder(curr):
 
    # return if Trie is empty
    if curr is None:
        return
 
    for i in range(26):
        if curr.character[i]:
            # if the current node is a leaf, print the key
            if curr.character[i].key:
                print(curr.character[i].key)
 
            preorder(curr.character[i])
 
 
if __name__ == '__main__':
 
    # given set of keys
    words = [
        'lexicographic', 'sorting', 'of', 'a', 'set', 'of', 'keys', 'can', 'be',
        'accomplished', 'with', 'a', 'simple', 'trie', 'based', 'algorithm',
        'we', 'insert', 'all', 'keys', 'in', 'a', 'trie', 'output', 'all',
        'keys', 'in', 'the', 'trie', 'by', 'means', 'of', 'preorder',
        'traversal', 'which', 'results', 'in', 'output', 'that', 'is', 'in',
        'lexicographically', 'increasing', 'order', 'preorder', 'traversal',
        'is', 'a', 'kind', 'of', 'depth', 'first', 'traversal'
    ]
 
    head = Trie()
 
    # insert all keys of a dictionary into a Trie
    for word in words:
        insert(head, word)
 
    # print keys in lexicographic order
    preorder(head)