import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskLinkProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onRemove: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onToggleItem: (item: TaskItemData) => void
  onFinishEditing: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onRemove,
    onPressLabel,
    simultaneousHandlers
  } = props

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [onToggleItem, data])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -47
      }}
    >
      <TaskItem
        isDone={data.done}
        isEditing={isEditing}
        subject={data.subject}
        onRemove={handleRemove}
        onPressLabel={handlePressLabel}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onToggleCheckbox={handleToggleCheckbox}
        simultaneousHandlers={simultaneousHandlers}
      />
    </StyledView>
  )
}

export default function TaskListItem(props: TaskLinkProps) {
  const { 
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props;

  const refScrollView = useRef(null);

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
