import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber: this.createRendomNum(),
      count: 0,
      hidden: style.hidden,
    };
  }

  createRendomNum() {
    return Math.floor(Math.random() * this.props.max - this.props.min) +
    this.props.min;
  }

  handleRepeat = (e) => {
    e.preventDefault();

    this.setState(state => {
      if (!state.userNumber) {
        return {
          randomNumber: this.createRendomNum(),
          result: 'Результат',
          count: 0,
          hidden: style.hidden,
        };
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного числа`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного числа`,
          userNumber: '',
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        hidden: style.btn,
        userNumber: '',
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
    console.log(this.state.randomNumber);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn}>Угадать</button>
          <button className={this.state.hidden}
            onClick={this.handleRepeat}>Сыграть ещё</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
