export function getDescriptionTime(date: string) {
    const dateUse = new Date(date)
    const now = new Date();
    const timeDiffMilliseconds = (Number(now) - Number(dateUse));
    const timeDiffSeconds = Math.floor(timeDiffMilliseconds / 1000);
    const timeDiffMinutes = Math.floor(timeDiffSeconds / 60);
    const timeDiffHours = Math.floor(timeDiffMinutes / 60);
    const timeDiffDays = Math.floor(timeDiffHours / 24);
    const timeDiffMonths = Math.floor(timeDiffDays / 30);
    const timeDiffYears = Math.floor(timeDiffMonths / 12);
  
    const timeUnits = [
      { value: timeDiffYears, unit: "año" },
      { value: timeDiffMonths, unit: "mes" },
      { value: timeDiffDays, unit: "día" },
      { value: timeDiffHours, unit: "hora" },
      { value: timeDiffMinutes, unit: "minuto" },
      { value: timeDiffSeconds, unit: "segundo" },
    ];
  
    for (const unit of timeUnits) {
      if (unit.value > 0) {
        return `Hace ${unit.value} ${unit.unit}${unit.value > 1 ? 's' : ''}`;
      }
    }
  
    return "Hace unos segundos";
  }