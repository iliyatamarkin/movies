import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SeatComponent } from '../Seat';
import seatsReducer, { toggleSeatSelection } from '../../store/seatsSlice';

describe('Seat Component', () => {
  const mockStore = configureStore({
    reducer: {
      seats: seatsReducer
    },
  });

  beforeEach(() => {
    // Initialize store with test data
    mockStore.dispatch({
      type: 'seats/setSeats',
      payload: {
        seat1: { id: 'seat1', status: 'available', price: 100, row: 'A', number: 1, type: 'regular' },
        seat2: { id: 'seat2', status: 'booked', price: 100, row: 'A', number: 2, type: 'regular' },
        seat3: { id: 'seat3', status: 'selected', price: 100, row: 'A', number: 3, type: 'regular' }
      }
    });
  });

  const renderSeat = (seatId: string) => {
    render(
      <Provider store={mockStore}>
        <SeatComponent id={seatId} showtimeId="showtime1" row="A" number={1} price={100} status="available" type="regular" />
      </Provider>
    );
  };

  it('renders correctly', () => {
    renderSeat('seat1');
    expect(screen.getByTestId('EventSeatIcon')).toBeInTheDocument();
  });

  it('shows available seat in default color', () => {
    renderSeat('seat1');
    const seatIcon = screen.getByTestId('EventSeatIcon');
    expect(seatIcon).toHaveStyle({ color: 'var(--text-primary)' });
  });

  it('shows booked seat in grey', () => {
    renderSeat('seat2');
    const seatIcon = screen.getByTestId('EventSeatIcon');
    expect(seatIcon).toHaveStyle({ color: 'var(--grey-500)' });
  });

  it('shows selected seat in primary color', () => {
    renderSeat('seat3');
    const seatIcon = screen.getByTestId('EventSeatIcon');
    expect(seatIcon).toHaveStyle({ color: 'var(--primary-main)' });
  });

  it('dispatches toggle action when clicking available seat', () => {
    const spy = jest.spyOn(mockStore, 'dispatch');
    renderSeat('seat1');
    
    fireEvent.click(screen.getByTestId('EventSeatIcon'));
    expect(spy).toHaveBeenCalledWith(toggleSeatSelection({ id: 'seat1', price: 100, row: 'A', number: 1, status: 'available', type: 'regular', showtimeId: 'showtime1' }));
  });

  it('does not dispatch toggle action when clicking booked seat', () => {
    const spy = jest.spyOn(mockStore, 'dispatch');
    renderSeat('seat2');
    
    fireEvent.click(screen.getByTestId('EventSeatIcon'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('applies hover styles on mouse over', () => {
    renderSeat('seat1');
    const seatIcon = screen.getByTestId('EventSeatIcon');
    
    fireEvent.mouseOver(seatIcon);
    expect(seatIcon).toHaveStyle({ transform: 'scale(1.1)' });
  });

  it('removes hover styles on mouse out', () => {
    renderSeat('seat1');
    const seatIcon = screen.getByTestId('EventSeatIcon');
    
    fireEvent.mouseOver(seatIcon);
    fireEvent.mouseOut(seatIcon);
    expect(seatIcon).not.toHaveStyle({ transform: 'scale(1.1)' });
  });
}); 