/* eslint-disable max-lines-per-function */
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Stepper from '../Stepper'
import withStep from '../withStep'

const Step = withStep(({ previous, next, activeStep }) => (
  <section data-testid="step">
    <h1>{activeStep}</h1>
    <p>description</p>
    <button onClick={previous} data-testid="step-previous-button">
      previous
    </button>
    <button onClick={next} data-testid="step-next-button">
      next
    </button>
  </section>
))

describe('<Stepper />', () => {
  const eventClick = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  })

  it('should render the first step as current', () => {
    const rtl = render(
      <Stepper>
        <Step stepName="step-1" />
        <Step stepName="step-2" />
      </Stepper>
    )

    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-1')
  })

  it('should render the active step by props', () => {
    const rtl = render(
      <Stepper activeStep="step-2">
        <Step stepName="step-1" />
        <Step stepName="step-2" />
      </Stepper>
    )

    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-2')
  })

  it('should go to the next step', () => {
    const rtl = render(
      <Stepper>
        <Step stepName="step-1" />
        <Step stepName="step-2" />
      </Stepper>
    )
    fireEvent(rtl.getByTestId('step-next-button'), eventClick)
    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-2')
  })

  it('should go to the previous step', () => {
    const rtl = render(
      <Stepper activeStep="step-2">
        <Step stepName="step-1" />
        <Step stepName="step-2" />
      </Stepper>
    )

    fireEvent(rtl.getByTestId('step-previous-button'), eventClick)

    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-1')
  })

  it('should go to the specific step', async () => {
    const StepGoTo = withStep(({ history, activeStep }) => (
      <section data-testid="step">
        <h1>{activeStep}</h1>
        <p>description</p>
        <button onClick={() => history.push('step-3')} data-testid="step-goto-button">
          go to step 3
        </button>
      </section>
    ))

    const rtl = render(
      <Stepper>
        <StepGoTo stepName="step-1" />
        <Step stepName="step-2" />
        <Step stepName="step-3" />
      </Stepper>
    )

    fireEvent(rtl.getByTestId('step-goto-button'), eventClick)

    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-3')
  })

  it('should call onFinish() on final step', () => {
    const onFinish = jest.fn()
    const rtl = render(
      <Stepper onFinish={onFinish}>
        <Step stepName="step-1" />
        <Step stepName="step-2" />
      </Stepper>
    )

    fireEvent(rtl.getByTestId('step-next-button'), eventClick)
    fireEvent(rtl.getByTestId('step-next-button'), eventClick)

    expect(rtl.container.children).toHaveLength(1)
    expect(rtl.getByTestId('step')).toHaveTextContent('step-2')
    expect(onFinish).toHaveBeenCalled()
  })

  it('shoulD render inner steppers', () => {
    const NestedStep = withStep(({ previous, next, activeStep }) => (
      <section data-testid="inner-step">
        <h1>{activeStep}</h1>
        <p>description</p>
        <button onClick={previous} data-testid="step-previous-button">
          previous
        </button>
        <button onClick={next} data-testid="inner-step-next-button">
          next
        </button>
      </section>
    ))
    const NestedStepper = withStep(({ next, activeStep }) => (
      <section data-testid="step">
        <h1>{activeStep}</h1>
        <Stepper onFinish={next}>
          <NestedStep stepName="inner-step-1" />
          <NestedStep stepName="inner-step-2" />
        </Stepper>
      </section>
    ))
    const rtl = render(
      <Stepper>
        <NestedStepper stepName="step-1" />
      </Stepper>
    )

    expect(rtl.getByTestId('step')).toHaveTextContent('step-1')
    expect(rtl.getByTestId('inner-step')).toHaveTextContent('inner-step-1')

    fireEvent(rtl.getByTestId('inner-step-next-button'), eventClick)

    expect(rtl.getByTestId('inner-step')).toHaveTextContent('inner-step-2')
  })
})
  