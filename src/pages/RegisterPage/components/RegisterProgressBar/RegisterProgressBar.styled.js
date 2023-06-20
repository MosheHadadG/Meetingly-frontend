import styled from "styled-components/macro";

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: white;
`;

const switchStepProgressBar = (step) => {
  switch (step) {
    case 0:
      return "25%";
    case 1:
      return "50%";
    case 2:
      return "75%";
    case 3:
      return "100%";
  }
};
export const ProgressBar = styled.div`
  width: ${({ step }) => switchStepProgressBar(step)};
  height: 100%;
  background-color: var(--color-primary-purple);
`;
