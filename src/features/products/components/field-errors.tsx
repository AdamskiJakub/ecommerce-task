interface FieldErrorsProps {
  errors: ReadonlyArray<unknown>;
}

export function FieldErrors({ errors }: FieldErrorsProps) {
  if (errors.length === 0) {
    return null;
  }

  const message = errors
    .map((error) =>
      typeof error === "string"
        ? error
        : error && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "",
    )
    .filter(Boolean)
    .join(", ");

  if (!message) {
    return null;
  }

  return <p className="text-[11px] text-destructive">{message}</p>;
}
