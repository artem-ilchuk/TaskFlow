import { Button } from "./Button";
import { partial } from "./Button";

const responsiveSizes = "btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl";

export const PrimaryButton = partial(Button, {
  color: "primary",
  variant: "outline",
  className: responsiveSizes,
});

export const SecondaryButton = partial(Button, {
  color: "secondary",
  variant: "outline",
  className: responsiveSizes,
});

export const SuccessButton = partial(Button, {
  color: "success",
  variant: "outline",
  className: responsiveSizes,
});

export const WarningButton = partial(Button, {
  color: "warning",
  variant: "outline",
  className: responsiveSizes,
});

export const DangerButton = partial(Button, {
  color: "error",
  variant: "outline",
  className: responsiveSizes,
});

export const AccentButton = partial(Button, {
  color: "accent",
  variant: "outline",
  className: responsiveSizes,
});
