import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';


import submitLogin from '~/form/submit/login';
import CenteringTemplate from '~/components/CenteringTemplate';
import LoginForm from '~/components/organisms/LoginForm';

const onSubmitSuccessDefault = () => {
    window.location.href = '/';
};

export default class Login extends React.PureComponent {
    static propType = {
        onSubmit: PropTypes.func,
        onSubmitSuccess: PropTypes.func,
    };

    static defaultProps = {
        onSubmit: submitLogin,
        onSubmitSuccess: onSubmitSuccessDefault,
    };

    constructor() {
        super();
        this.onSubmit = :: this.onSubmit;
        this.onSubmitSuccess = :: this.onSubmitSuccess;
    }
    onSubmit(valeus) {
        const { onSubmit } = this.props;
        if (onSubmit) {
            return onSubmit(values);
        }
        return null;
    }

    onSubmitSuccess() {
        const { onSubmitSuccess } = this.props;
        if (onSubmitSuccess) {
            return onSubmitSuccess();
        }
        return null;
    }

    render() {
        const contentsEl = (
            <>
                <h1>ログイン</h1>
                <LoginForm
                    onSubmit={this.onSubmit}
                    onSubmitSuccess={this.onSubmitSuccess}
                />
                <Link to={{ pathname: 'logint/password-reminder' }}>パスワードを忘れた方はこちら</Link>
            </>
        );
        return (
            <CenteringTemplate
                vertical
                horizontal
                className="p_login"
                contens={contentsEl}
            />
        );
    }
}