import React from 'react'
import EditIcon from '@atlaskit/icon/glyph/edit'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import CheckIcon from '@atlaskit/icon/glyph/check'
import Button from '@atlaskit/button'
import styled , { css } from 'styled-components'

const ButtonStyled = styled(Button)`
  text-align : left;
  margin-bottom : 10px;
  
  ${
    (p) =>
      p.iscompleted && (css`
          text-decoration: line-through;
          &:hover {
            text-decoration: line-through;
          }
        `)
    }
  }

  .icon {
    display: inline-block;

    &:hover {
      background-color: #999;
      border-radius: 3px;
    }
  }
`;

export default function Todo(
    { todo , onCheckBtnClick, onRemoveBtnClick, openModal }) {
  return (
    <ButtonStyled
      iscompleted={todo.isCompleted ? 1 : 0}
      shouldFitContainer
      iconAfter={
        <div className='action'>
          { !todo.isCompleted &&
            <span className='icon' onClick={() => onCheckBtnClick(todo)} >
              <CheckIcon primaryColor='green' /> 
            </span>
          }
          { !todo.isCompleted &&
          <span className='icon' onClick={() => openModal(todo)}><EditIcon primaryColor='blue' /></span>
          }
          <span className='icon' onClick={() => onRemoveBtnClick(todo)}><EditorRemoveIcon primaryColor='red' /></span>
        </div>
      }
    >{todo.name}</ButtonStyled>
  );
}