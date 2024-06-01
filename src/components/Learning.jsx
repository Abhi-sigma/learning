import React from 'react';

const LearningPage = () => {

  return (
    <div className='app_background_start'>
      <div className="welcome_text">Start Learning</div>
        {/* Add learning content and components */}
        <div className="card_holder">
            <div className="card">
                {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
                <div className="card-content">
                    <h3>Three Letter Words</h3>
                    <p>A fun way to learn most used three letter words</p>
                    <a href="#" className="btn">Lets Go</a>
                </div>
            </div>
            <div className="card">
                {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
                <div className="card-content">
                    <h3>Animals</h3>
                    <p>Learn Animal Words</p>
                    <a href="#" className="btn">Lets Go</a>
                </div>
            </div>
            <div className="card">
                {/* <img src="https://placeimg.com/300/200/any" alt="Card Image"/> */}
                <div className="card-content">
                    <h3>Actions</h3>
                    <p>What we do</p>
                    <a href="#" className="btn">Lets Go</a>
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default LearningPage;