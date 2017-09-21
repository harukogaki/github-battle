var React = require('react');

class SelectLanguage extends React.Component{
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return(
      <ul className='languages'>
        {languages.map(function(lang){
          return (
            <li
              style = {(lang === this.props.selectedLanguage) ? {color : '#d0021b'} : null }
              key = {lang}
              onClick = {this.props.onSelect.bind(null,lang)}>
              {lang}
            </li>
          )
        }, this)}
      </ul>
    )
  }
}


class Popular extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(language){
    this.setState(function(){
      return {
        selectedLanguage: language
      }
    });
  }


  render() {
    return(
      <div>
      <SelectLanguage
        selectedLanguage = {this.state.selectedLanguage}
        onSelect = {this.updateLanguage}
      />
      </div>
    );
  }
}

module.exports = Popular;
