var Section = React.createClass({
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
                   <select className="pull-right" ref="selectInput" onChange={this.updateLanguage} defaultValue={this.state.lang}>
                        <option value="en">en</option>
                        <option value="fr">fr</option>
                    </select>
                    <nav>
                        <ul className="nav nav-tabs">
                            {this.state.menu.map(function(menu, i) {
                                if (menu.url.indexOf('welcome') >= 0) {
                                    return <li key={i} className="active"><a data-toggle="tab" href={"#article-content" + i}>{menu.name}</a></li>
                                } else {
                                    return <li key={i}><a data-toggle="tab" href={"#article-content" + i}>{menu.name}</a></li>
                                }
                            })}
                        </ul>
                    </nav>
                    <section className="tab-content">
                        {this.state.menu.map(function(menu, i) {
                            console.log(menu, i);
                            return <Article key={i} index={i} url={menu.url} />
                        })}
                    </section>
                </div>)
    }
});

var Article = React.createClass({
    componentDidMount: function() {
        this.updatePageContent(this.props);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        var shouldUpdate = nextProps.url !== this.props.url;

        if (shouldUpdate) {
            this.updatePageContent(nextProps);
        }
        return shouldUpdate;
    },
    updatePageContent: function(props) {
        $('#article-content' +  props.index).load(props.url);
    },
    render: function() {
        if (this.props.url.indexOf('welcome') >= 0) {
            return <article className="tab-pane fade in active" id={"article-content" + this.props.index}></article>
        } else {
            return <article className="tab-pane fade" id={"article-content" + this.props.index}></article>
        }
    }
})

ReactDOM.render(<Section/>,
    document.getElementById('section-content'));
