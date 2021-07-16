import styled from "styled-components";

const Card = styled.div<{ borderTop?: boolean }>`
  ${(props) => (props.borderTop ? "border-top: 3px solid darkblue;" : "")}
  /* border: 1px solid #bbb; */
  border-radius: 3px 3px 0 0;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.2);
`;
const CardTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #d5d5d5;

  h2 {
    margin: 0;
  }
`;

const CardBody = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding ?? "1rem"};
`;

export { Card, CardTitle, CardBody };
