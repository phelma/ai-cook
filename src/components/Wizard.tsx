'use client'

import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-stone-200/50 backdrop-blur-sm bg-white/80 dark:bg-stone-950/80">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-2xl font-bold">
            {steps[currentStep - 1].title}
          </CardTitle>
          <Link href="/setup">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <Timeline
          steps={steps.map((step) => step.title)}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </CardHeader>
      <CardContent>
        <CurrentStepComponent onComplete={handleNext} />
      </CardContent>
    </Card>
  )
}
