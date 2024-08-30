import {defineStore} from 'pinia'
import { ref, computed } from 'vue';

 interface Schedule {
    id: number;
    title: string;
    date: string;
    color: string;
    memo:string;
    joiner:[];
  }
  
  interface Day {
    key: string;
    date: number | null;
    schedules: Schedule[];
    isCurrentMonth: boolean;
  }
  export const useCalendarStore = defineStore('calendar', () => {
    const year = ref(new Date().getFullYear());
    const month = ref(new Date().getMonth());
    const weeks = ref<Day[][]>([]);
    const calendarDatas = ref<Schedule[]>([])

    const selectedDate = ref <string | null >(null);

    const filteredSchedules = computed(()=> {
        if(selectedDate.value) {
            return calendarDatas.value.filter(schedule => schedule.date === selectedDate.value)
        }
        return [];
    })
//모듈화 할 수 있도록 코드 분리 function, code 분ㄹ!
// 이전달, 다음달은 일단 빼기, 일단 최적화(?) 시키고 작업
//날짜 생성하는 

// 2차원 배열을 생성하는게 키다!!!

  // 현재 달의 첫쨋날의 date값 을 가져와 , 마지막 날도 가져와,
  // 주의 시작은 일요일, 마지막날은 토요일로 설정해.

  // 몇요일인지 넣어. 이번 달이 아닐 경우 알단 0으로 채우고 선택 달의 1일부터 넣어. 첫 주가 끝날 때까지.
  // 둘쨋주부터 마지막 날이 될때까지 week배열에 하나씩 넣어 weeks를 만들어
  // week를 만들 때 마지막 날이 되면 week.length가 7인지 확인하고 부족한 만큼 0을 넣어  

  // 달력 생성이 완료되면 스케쥴 데이터를 가져와서 스케쥴 date와 일치하는 날짜에만 해당 date의 데이터를 넣어
  // 완성되면 최종 뿌려질 배열에 이걸 넣어!

  // 첫 로딩 시 스케쥴 리스트에 들어갈 스케쥴은 '오늘'기준

  // 유저가 날짜를 클릭하면 해당 날짜 데이터를 가져와
  // 데이터를 스케쥴 리스트로 보내


    const generateCalendar = () => {
        const firstDayOfMonth = new Date(year.value, month.value, 1).getDay();
        const lastDateOfMonth = new Date(year.value, month.value + 1, 0).getDate();
      
        const daysInWeek: Day[][] = [];
        let currentWeek: Day[] = [];
      // 날짜 형식 일치하는게 좋음. 이전 형식 : 2024 - 8 -10 > 2024-08-10
        const schedulesHashTable: { [key: string]: Schedule[] } = {
          '2024-08-10': [
            { id: 1, title: 'Title', date: '2024-08-10', color: 'red' , memo:'',joiner:[]},
            { id: 2, title: 'Title2', date: '2024-08-10', color: 'blue', memo:'',joiner:[] },
          ],
          '2024-08-11': [
            { id: 3, title: 'Title3', date: '2024-08-11', color: 'green' , memo:'',joiner:[]},
          ],
          '2024-08-12': [
            { id: 4, title: 'Title4', date: '2024-08-12', color: 'yellow' , memo:'',joiner:[]},
          ],
        };
      
        // 이전 달의 날짜 채우기
        const prevMonthLastDate = new Date(year.value, month.value, 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          const date = prevMonthLastDate - i;
          currentWeek.push({
            key: `prev-${date}`,
            date,
            schedules: [],
            isCurrentMonth: false,
          });
        }

      
      
        // 현재 달의 날짜 채우기
        for (let date = 1; date <= lastDateOfMonth; date++) {
          const schedules = schedulesHashTable[`${year.value}-${month.value + 1}-${date}`] || [];
          currentWeek.push({
            key: `cur-${date}`,
            date,
            schedules,
            isCurrentMonth: true,
          });
          if (currentWeek.length === 7) {
            daysInWeek.push(currentWeek);
            currentWeek = [];
          }
        }
        // 보여지는 파트와 생성 파트를 분리했으면 좋겠다. 
        // 주를 만든느거랑 날짜에 데이터 넣는걸 분리. > 왜냐면, 분리해서 작업해야 유지보수 및 디버깅, 테스트가 쉬워진다. 
        // 함수 하나에 하나의 역할/일 만하도록 짜는게 좋음
        //   while과 for의 차이가 있음 while은 끝이 안정해졌을때 많이 쓴당. for 느


        // 다음 달의 날짜 채우기
        let nextMonthDate = 1;
        while (currentWeek.length < 7) {
          currentWeek.push({
            key: `next-${nextMonthDate}`,
            date: nextMonthDate,
            schedules: [],
            isCurrentMonth: false,
          });
          nextMonthDate++;
        }
        if (currentWeek.length > 0) {
          daysInWeek.push(currentWeek);
        }
      
        weeks.value = daysInWeek;
      };
      
      const prevMonth = () => {
        if (month.value === 0) {
          year.value--;
          month.value = 11;
        } else {
          month.value--;
        }
        generateCalendar();
      };
      
      const nextMonth = () => {
        if (month.value === 11) {
          year.value++;
          month.value = 0;
        } else {
          month.value++;
        }
        generateCalendar();
      };
      const selectDate = (date:string) => {
        selectedDate.value = date;
      }
      const getDateSchedule = (day) => {

      }
      return {
        year, 
        month,
        weeks,
        calendarDatas,
        generateCalendar,
        filteredSchedules,
        selectDate,
        prevMonth,
        nextMonth,
        getDateSchedule,
      }

  })
