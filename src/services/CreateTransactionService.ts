import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    const { transactionsRepository } = this;
    const balance = transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total - value < 0) {
      throw Error('Outcome value greater than current available value');
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
