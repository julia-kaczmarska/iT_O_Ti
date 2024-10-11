import React from 'react';

const MyNavigation = ({ onNavigate }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

            <div>
                <button onClick={() => onNavigate('PREV')}>Poprzedni</button>
                <button onClick={() => onNavigate('TODAY')}>Dziś</button>
                <button onClick={() => onNavigate('NEXT')}>Następny</button>
            </div>
            {/*<div>*/}
            {/*    <button onClick={() => onView('month')}>Miesiąc</button>*/}
            {/*    <button onClick={() => onView('week')}>Tydzień</button>*/}
            {/*    <button onClick={() => onView('day')}>Dzień</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default MyNavigation;
