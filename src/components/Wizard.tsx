'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Timeline from './Timeline'

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { title: 'Pick Ingredients', component: Step1 },
    { title: 'Select a Meal', component: Step2 },
    { title: 'Recipe', component: Step3 },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          {steps[currentStep - 1].title}
        </CardTitle>
        <Timeline
          steps={steps.map((step) => step.title)}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </CardHeader>
      <CardContent>
        <CurrentStepComponent next={handleNext} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </Button>
        {
          currentStep < steps.length ? (
            <Button onClick={handleNext}>Next</Button>
          ) : null
          // <Button onClick={handleSubmit}>Submit</Button>
        }
      </CardFooter>
    </Card>
  )
}
