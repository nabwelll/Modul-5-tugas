import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Recipe from './Recipe';

const RecipeDetail = ({ recipe }) => {
    return (
        <div>
            <h2>{recipe.title}</h2>
            <Recipe recipe={recipe} />
        </div>
    );
};

RecipeDetail.propTypes = {
    recipe: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const recipeId = ownProps.match.params.id;
    return {
        recipe: state.recipes.find((recipe) => recipe.id === recipeId),
    };
};

export default connect(mapStateToProps)(RecipeDetail);