define(['react', '../Utils/ComingSoon'], function(React, ComingSoon) {
  const { PropTypes } = React

  const Content = ({ active, children }) => {
    return (
      <div className='container wrap'>
        <h1>Explore</h1>
        
        <ComingSoon />
      </div>
    )
  }

  Content.propTypes = {
  }

  return Content
})
