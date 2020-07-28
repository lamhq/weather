import React from 'react';
import renderer from 'react-test-renderer';
import DailyForecast from './DailyForecast';

describe('DailyForecast component', () => {
  it('should match snapshot', () => {
    const tree = renderer
      .create(<DailyForecast date="Monday" minTemp={20} maxTemp={28} weatherImgUrl="/" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
