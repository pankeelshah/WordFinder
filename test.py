import re

def findAllWords(fname):
    fp = open(fname)
    strings = re.findall(r'',fp.read())
    print(strings)

#findAllWords("test.txt")

n = ['yyyyy', 'aaaaa', 'yyy', 'aaa']
n.sort() # sorts normally by alphabetical order
print(n)
n.sort(key=len, reverse=False) # sorts by descending length
print(n)
