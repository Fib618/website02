import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createBrowserHistory} from 'history';
import { ConnectedRouter } from 'connected-react-router';
import {MuiThemeProvider} from '@material-ui/core'

import '~/styles/main.less';
import theme from '~/styles/theme';
import init from '~/utils/init';
import configureStore from '~/configureStore';