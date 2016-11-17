import sys
import os
from cruddy2 import app
import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT',5000))
    if os.environ['LOCALHOST'] == '1':
        host = '127.0.0.1'
    else:
        host = '0.0.0.0'

    app.run(host=host, port=port, debug=True)
