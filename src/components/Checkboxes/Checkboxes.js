import React, { Component, Fragment } from 'react';
import { Options, Selected } from "./Options";

class Checkboxes extends Component {

    constructor(props){
        super(props)
        this.state = {
            options: new Options(this.props?.options) || [],
            selected: new Selected(this.props?.selected) || [],
            prevOptions: new Options(this.props?.options) || [],
            prevSelected: new Selected(this.props?.selected) || [],
        }
    }

    componentDidMount = () => {
        let options = this.state.options;
        if (!(options instanceof Options)) {
            options = new Options(this.state.options);
        }
        if (this.props?.selected) {
            options.setDefault(this.state?.selected);
        }
        this.setState({ options: options })
    }

    static getDerivedStateFromProps = (props, state) => {
        if (state.prevSelected !== props.selected || state.prevOptions !== props.options) {
            if (state.prevSelected !== props.selected) {
                state.selected = props.selected;
                state.prevSelected = props.selected;
            }
            if (state.prevOptions !== props.options) {
                state.options = props.options;
                state.prevOptions = props.options;
            }
            return state;
        }
        return null;
    }

    getSelected = (option, index) => {
        // console.log(this.state.selected)
        let selected = this.state.selected;
        if (!(selected instanceof Selected)) {
            selected = new Selected(this.state.selected);
        }
        selected.setSelected(option);
        let options = this.state.options;
        if (!(options instanceof Options)) {
            options = new Options(this.state.options);
        }
        options.toggleChecked(index);
        this.setState({
            options: options,
            selected: selected
        })
        let newOptions = new Options(selected);
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
                        type="checkbox"
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


export default Checkboxes;

{/* <Checkboxes
options={this.props?.moduleList} // array of all options
direction="columns"
containerClass="grid grid-cols-3"
containerWidth="flex-wrap"
selected={[this.props?.moduleList[0]]} // array of options to set default checked
getSelected={(selected)=>{this.setSelected(selected)}} // to get array of strings
getSelectedOptions={(selected)=>{this.setSelected(selected)}} // to get array of objects
optionProps={["label", "value"]} // array of property names to get in resultant option object
></Checkboxes> */}