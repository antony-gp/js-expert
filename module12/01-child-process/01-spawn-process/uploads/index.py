import sys
import json
from urllib import request

# python3 index.py '{"filePath":"data.csv","url":"http://localhost:3000"}'

def main():
  item = json.loads(sys.argv[1])
  url = item.get('url')
  filePath = item.get('filePath')
  data = open(filePath, 'rb').read()
  req = request.Request(url, data)
  res = request.urlopen(req).read().decode('utf-8')
  print(res)

if __name__ == '__main__':
  main()