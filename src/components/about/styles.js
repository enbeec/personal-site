import styled, { css } from "styled-components";
import Collapsible from "react-collapsible";

export const AboutContainer = styled.div`
  background: lavender;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 2rem;
  padding-bottom: 2rem;
  min-width: 30rem;
  box-shadow: 0px 0px 1px 1px darkgrey;
`;

export const InsetCollapsible = styled(Collapsible)`
  border: 3px inset #d9d9ed;
  border-radius: 6px;
`;

export const AboutTextContainer = styled.div`
  padding-left: 4rem;
  padding-right: 8rem;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  min-width: 27rem;
`;

export const AboutName = styled.div`
  font-size: 2rem;
`;

export const AboutText = styled.div`
  white-space: pre-wrap;
  font-style: Oblique;
  font-size: 1.1rem;
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`;

export const TriggerText = styled(AboutText)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  /* color is based on lavender */
  /* border: 3px inset #d9d9ed;
  border-radius: 6px; */
  cursor: pointer;
`;

export const ClickToExpand = styled.span`
  color: black;
  ::after {
    content: "...click to expand...";
  }
  margin-left: 4rem;
  margin-right: 4rem;
  opacity: 0%;
  /* transition: opacity 1.2s ease-out; */
  ${TriggerText}:hover & {
    animation: flash 1.2s ease-in-out infinite alternate;
  }
  @keyframes flash {
    from {
      opacity: 0%;
    }
    to {
      opacity: 60%;
    }
  }
`;

const AvatarContainer = styled.div`
  margin-top: 1rem;
  margin-left: 2rem;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 2px;
  background-color: white;
  max-width: 100%;
  height: auto;
  flex-shrink: 0.6;
  flex-grow: 1;
`;

const AvatarImage = styled.img`
  flex-shrink: inherit;
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const Avatar = ({ src, alt, ...props }) => (
  <AvatarContainer>
    <AvatarImage src={src} alt={alt} {...props} />
  </AvatarContainer>
);
