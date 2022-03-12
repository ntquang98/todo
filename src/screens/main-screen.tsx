import shortid from 'shortid'
import React, { useCallback, useState } from 'react'
import { Center, VStack, useColorModeValue, Icon, Fab } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/theme-toggle'
import TaskList from '../components/task-list'
import AnimatedColorBox from '../components/animated-color-box'
import MastHead from '../components/masthead'
import NavBar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Kiss my baby',
    done: false,
  }, 
  {
    id: shortid.generate(),
    subject: 'Feed Uc Ec',
    done: false
  }
]

export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string|null>(null)

  const handleToggleTaskItem = useCallback((editedItem) => {
    setData(prevData => prevData.map(item => {
      if (item.id === editedItem.id) {
        return {
          ...item,
          done: !item.done
        }
      }
      return item
    }))
  }, [])

  const handleChangeTaskItemSubject = useCallback((editedItem, newSubject) => {
    setData(prevData => prevData.map(item => {
      if (item.id === editedItem.id) {
        return {
          ...item,
          subject: newSubject,
        }
      } 
      return item
    }))
  }, [])

  const handleFinishEditing = useCallback((editedItem) => {
    setEditingItemId(null);
  }, [])

  const handlePressLabel = useCallback((editedItem) => {
    setEditingItemId(editedItem.id);
  }, [])

  const handleRemoveItem = useCallback((editedItem) => {
    setData(prev => prev.filter(item => item.id !== editedItem.id));
  }, [])

  return (
    <AnimatedColorBox
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      flex={1}
    >
      <MastHead
          title="What's up, Bro!"
          image={require('../assets/masthead.png')}
      >
        <NavBar />
      </MastHead>
      <VStack 
        flex={1}
        space={1} 
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
        <TaskList 
          data={data}
          editingItemId={editingItemId}
          onPressLabel={handlePressLabel}
          onRemoveItem={handleRemoveItem}
          onToggleItem={handleToggleTaskItem}
          onFinishEditing={handleFinishEditing}
          onChangeSubject={handleChangeTaskItemSubject}
        />
      </VStack>
      <Fab 
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus"/>} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData(prev => ([
            {
              id,
              subject: '',
              done: false,
            }, 
            ...prev
          ]))
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
