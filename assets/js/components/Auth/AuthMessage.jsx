define (['react'], function (React) {
    
    const { Component } = React
    
    class AuthMessage extends Component {
        render() {
            if (!this.props.message) return <span />;
            let message = ''
        
            if (typeof this.props.message != 'array') message = '' + this.props.message
            else message = this.props.message[0]
            
            return (
                <div className='alert alert-danger' id='danger-message'>{message}</div>
            )
        }
    }
    
    return AuthMessage
})