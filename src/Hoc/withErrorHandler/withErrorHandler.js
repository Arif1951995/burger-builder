import React , { Component } from 'react'
import HOC from '../HOC';
import Modal from '../../components/UI/Mdal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }
        confirmErrorHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            

            return (
                <HOC>
                    <Modal show={this.state.error}
                    backdropCLicked={this.confirmErrorHandler}>
                        
                        {this.state.error && this.state.error.message}
                    </Modal>
                <WrappedComponent {...this.props} />
            </HOC>
            );

        }
       
    }
}

export default withErrorHandler