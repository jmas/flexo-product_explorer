import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Editor from './components/editor';
import * as actionCreators from './actions';

const mapStateToProps = state => ({
    ...state,
    editing: !!state.imageUrl,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
