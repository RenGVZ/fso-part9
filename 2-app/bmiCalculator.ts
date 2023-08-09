const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(175.2, 120))
