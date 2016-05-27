var Article = React.createClass({
    getInitialState: function() {
        return {
          lang : 'fr',
          allMenu: {},
          menu: []
        }
    },
    updateLanguage: function() {
        var newLang = this.refs.selectInput.value;
        var allMenu = this.state.allMenu;
        this.setState({
                lang: newLang,
                menu: allMenu[newLang],
                allMenu: allMenu
            });
    },
    componentWillMount: function() {
        self = this;
        $.getJSON('pages/menu.json')
            .then(function(result) {
                var currentLang = self.state.lang;
                var currentMenu = result[self.state.lang];
                self.setState({
                    lang: currentLang,
                    allMenu: result,
                    menu: currentMenu
                });
            });
    },
    render: function() {
        return (<div>
                    <nav>
                        <select ref="selectInput" onChange={this.updateLanguage} defaultValue={this.state.lang}>
                            <option value="en">en</option>
                            <option value="fr">fr</option>
                        </select>
                        <ul>
                            {this.state.menu.map(function(menu, i) {
                                return <li><a key={i} href={menu.url}>{menu.name}</a></li>
                            })}
                        </ul>
                    </nav>

                </div>)
    }
});

ReactDOM.render(<Article/>,
            document.getElementById('article-content'));
