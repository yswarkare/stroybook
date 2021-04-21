import React, { Component, Fragment } from 'react';
import { Options } from "./Options";
// import PropTypes from 'prop-types';


class RadioButtons extends Component {

    constructor(props){
        super(props)
        this.state = {
            options: new Options(this.props?.options) || [],
            prevOptions: new Options(this.props?.options) || [],
        }
    }

    componentDidMount = () => {
        let options = this.state.options;
        if (!(options instanceof Options)) {
            options = new Options(this.state.options);
        }
        if (this.props.selected) {
            options.setSelected(this.props.selected[0]);
        }
        this.setState({ options: options })
    }

    static getDerivedStateFromProps = (props, state) => {
        if (state.prevOptions !== props.options) {
            state.options = props.options;
            state.prevOptions = props.options;
            return state;
        }
        return null;
    }

    getSelected = (option, index) => {
        // console.log(this.state.selected)
        let options = this.state.options;
        if (!(options instanceof Options)) {
            options = new Options(this.state.options);
        }
        options.setSelected(option);
        this.setState({
            options: options,
        })
        let newOptions = new Options(options);
        if (this.props.getSelected) {
            let result = Options.getSelected(newOptions);
            this.props.getSelected(result)
        }
        if (this.props.getSelectedOptions) {
            if (this.props.optionProps) {
                let result = Options.deleteProps(newOptions, this.props.optionProps);
                this.props.getSelectedOptions(result);
            } else {
                this.props.getSelectedOptions(newOptions);
            }
        }
    }

    render () {
        return (
        <Fragment>
        <div className={`${this.props?.containerWidth || "w-fill"} ${this.props?.direction === "rows" ? "flex flex-row justify-start content-start items-start" : this.props?.direction === "columns" ? "flex flex-col" : "flex flex-col justify-start content-start items-start" } ${this.props?.containerClass || ""}`}
        style={this.props?.containerStyle}
        >
            {
                this.state?.options?.map?.((option, index)=>{
                    // console.log(option.backgroundColor)
                    return (
                    <div key={index} className={`w-fit px-1 flex flex-row justify-center content-center items-center`}
                    onClick={()=>{this.getSelected(option, index)}}
                    style={{
                        backgroundColor: `${option.backgroundColor}`,
                        ...this.props.wrapperStyle
                    }}
                    >
                        <input
                        type="radio"
                        className={`pr-2 ${this.props?.checkboxClass}`}
                        name={`${option?.name}`}
                        label={`${option?.label}`}
                        value={option?.value}
                        checked={option?.checked}
                        defaultChecked={option?.defaultChecked}
                        disabled={this.props?.disabled}
                        ></input>
                        <label
                        className={`pl-2 ${this.props?.labelClass}`}
                        >
                            {`${option?.label || option?.name || option?.value}`}
                        </label>
                    </div>
                    )
                })
            }
        </div>
        </Fragment>
        )
    }
}

// RadioButtons.propTypes = {
//     options: PropTypes.array,
//     direction: PropTypes.string,
//     containerClass: PropTypes.string,
//     containerWidth: PropTypes.any,
//     selected: PropTypes.array,
//     getSelected: PropTypes.func,
//     getSelectedOptions: PropTypes.func,
//     optionProps: PropTypes.array,
// }

export default RadioButtons;

{/* <RadioButtons
options={this.props?.moduleList} // array of all options
direction="columns"
containerClass="grid grid-cols-3"
containerWidth="flex-wrap"
selected={[this.props?.moduleList[0]]} // array of options to set default checked
getSelected={(selected)=>{this.setSelected(selected)}} // to get array of strings
getSelectedOptions={(selected)=>{this.setSelected(selected)}} // to get array of objects
optionProps={["label", "value"]} // array of property names to get in resultant option object
></RadioButtons> */}