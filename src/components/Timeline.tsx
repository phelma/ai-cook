import { Check } from 'lucide-react'

interface TimelineProps {
  steps: string[]
  currentStep: number
}

export default function Timeline({ steps, currentStep }: TimelineProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index < currentStep
                ? 'bg-primary text-primary-foreground'
                : index === currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div className="text-xs mt-2 text-center">{step}</div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-full ${
                index < currentStep ? 'bg-primary' : 'bg-secondary'
              }`}
              style={{
                position: 'absolute',
                left: `calc(${((index + 1) / steps.length) * 100}% - 2px)`,
                top: '1rem',
                transform: 'translateY(-50%)',
                width: `calc(${100 / steps.length}% - 1rem)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
