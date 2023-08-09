const calculateBmi = (): string => {
  const height: number = Number(process.argv[2])
  const weight: number = Number(process.argv[3])
  let bmi: number = weight / ((height * height) / 10000)
  console.log('bmi:', bmi);

  switch (true) {
    case bmi < 18.5:
      return "Underweight"
    case bmi >= 18.5 && bmi <= 24.5:
      return "Normal weight"
    case bmi > 24.5 && bmi <= 29.9:
      return "Overweight"
    case bmi > 29.0 && bmi <= 34.9:
      return "Obesity class I"
    case bmi > 34.9 && bmi <= 39.9:
      return "Obesity class II"
    case bmi > 39.9:
      return "Obesity class III"
    default:
      throw new Error("Cannot determine BMI")
  }
}

try {
  console.log(calculateBmi())
} catch(e: unknown) {
  let errorMessage = 'Error: '
  if(e instanceof Error) {
    errorMessage += e.message
  }
  console.log(errorMessage);
}
