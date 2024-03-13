import styled from "styled-components";

export const StyledAccordion = styled.div`
  
  .accordion-wrapper {
    width: 100vh;
    border: solid 1px #ccc;
    & + * {
      margin-top: 0.5em;
    }
  }
  
  .accordion-item {
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
    height: auto;
    max-height: 9999px;
  }
  
  .accordion-item.collapsed {
    max-height: 0;
    transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
  }
  
  .accordion-title {
    font-weight: 600;
    cursor: pointer;
    color: #666;
    padding: 0.5em 1.5em;
    border-bottom: solid 1px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid currentColor;
    }
  
    &:hover,
    &.open {
      color: black;
    }
  
    &.open {
      &::after {
        content: "";
        border-top: 0;
        border-bottom: 5px solid;
      }
    }
  }
  
  .accordion-content {
    padding: 1em 1.5em;
  }
  
`