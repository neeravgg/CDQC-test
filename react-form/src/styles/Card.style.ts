import styled from "styled-components";

export const StyledCard = styled.div`
  
  .card-wrapper {
    width: 100vh;
    border: solid 1px #ccc;
  
  }
  
  .card-item {
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
    height: auto;
    max-height: 9999px;
  }
  
  
  .card-title {
    font-weight: 600;
    cursor: pointer;
    color: #666;
    padding: 0.5em 1.5em;
    border-bottom: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    padding: 1em 1.5em;
  }
  
`