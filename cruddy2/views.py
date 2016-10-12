from cruddy2 import app

@app.route('/')
def index():
    sessionManager = DBSessionManager()
    user = User('Sam', 'Cohen')
    sessionManager.CommitToSession(user)
    return render_template('index.html')


@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
