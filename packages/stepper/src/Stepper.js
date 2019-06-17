import React, {Component} from 'react'
import {createMemoryHistory} from 'history'
import {isEqual} from 'lodash'
import PropTypes from 'prop-types'

const StepperContext = React.createContext()

class Stepper extends Component {
  static Consumer = StepperContext.Consumer

  get previousStep() {
    return this.steps[this.steps.indexOf(this.state.activeStep) - 1]
  }

  get nextStep() {
    return this.steps[this.steps.indexOf(this.state.activeStep) + 1]
  }

  previous = () => {
    const {onChange} = this.props

    if (this.previousStep != null) {
      const previousStep = this.previousStep
      this.sendHistory(previousStep)
      this.setState({activeStep: previousStep})
      onChange(previousStep, this.steps)
    }
  }

  next = () => {
    const {onFinish, onChange} = this.props

    if (this.nextStep == null) {
      onFinish()
      return
    }

    const nextStep = this.nextStep
    this.sendHistory(nextStep)
    this.setState({activeStep: nextStep})
    onChange(nextStep, this.steps)
  }

  stepToPath = stepName => `${this.props.basename}/${stepName.replace(/^\//g, '')}`

  pathToStep = pathname => {
    const pathStep = pathname.replace(`${this.props.basename}/`, '/')
    const [step] = this.steps.filter(stepName => stepName.replace(/^\//g, '') === pathStep.replace(/^\//g, ''))
    return step || this.state.step
  }

  childrenToStepList(arrChildren) {
    return arrChildren.map(child => child.props.stepName)
  }

  sendHistory(path, method = 'push') {
    const uri = []
    if(this.props.basename)
      uri.push(this.props.basename.replace(/^\/|\/$/g, ''))
    uri.push(path.replace(/^\/|\/$/g, ''))
    this.history[method](`/${uri.join('/')}`)
  }

  constructor(props) {
    super(props)
    this.steps = this.childrenToStepList(
      React.Children.toArray(this.props.children),
    )

    this.state = { activeStep: this.props.activeStep || this.steps[0] }

    this.history = props.history || createMemoryHistory()
    this.sendHistory(this.state.activeStep, 'replace')
    this.unlisten = this.history.listen(({pathname}) => {
      this.setState({activeStep: this.pathToStep(pathname)})
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  componentWillReceiveProps({children}) {
    const newSteps = React.Children.toArray(children)
    if (!isEqual(this.steps, newSteps)) {
      this.steps = this.childrenToStepList(newSteps)
    }
  }

  render() {
    const {activeStep} = this.state
    const {onFinish} = this.props
    const children = React.Children.toArray(this.props.children)
    const extraProps = {
      activeStep,
      previous: this.previous,
      steps: this.steps,
      next: this.next,
      history: this.history,
      onFinish,
    }

    const [child = null] = children.filter(({props: {stepName}}) => {
      return activeStep === stepName
    })

    return (
      <StepperContext.Provider value={extraProps}>
        {child}
      </StepperContext.Provider>
    )
  }
}

Stepper.propTypes = {
  basename: PropTypes.string,
  activeStep: PropTypes.string,
  onFinish: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  history: PropTypes.shape({
    entries: PropTypes.array,
    go: PropTypes.func,
    goBack: PropTypes.func,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
}

Stepper.defaultProps = {
  basename: '',
  onFinish: () => {},
  onChange: () => {},
}

export default Stepper
