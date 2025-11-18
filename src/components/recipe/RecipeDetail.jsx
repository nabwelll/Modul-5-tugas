import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeActions from '../../actions/recipeActions';
import RecipeDetails from '../../components/RecipeDetails';

class RecipeDetail extends React.Component {
    // component logic
}

RecipeDetail.propTypes = {
    recipe: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    recipe: state.recipe,
});

const actionCreators = {
    // action creators
};

export default connect(mapStateToProps, actionCreators)(RecipeDetail);