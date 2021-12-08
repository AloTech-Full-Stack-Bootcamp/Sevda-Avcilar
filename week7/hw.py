from random import randint


def random_number_generator(n, l=6):
    numbers = set()
    for i in range(n):
        if(i == 0):
            number = randint(10**(l-1), (10**l)-1)
            numbers.add(number)
            yield number
        else:
            number = randint(10**(l-1), (10**l)-1)
            while(number in numbers):
                number = randint(10**(l-1), (10**l)-1)
            numbers.add(number)
            yield number


"""generator = random_number_generator(6)
print(list(generator))"""


def my_awesome_decorator(fun):
    def wrapped(*args):
        return fun(*[i+1 for i in args])
    return wrapped


@my_awesome_decorator
def mod_batch(*numbers):
    return all([True if i % 3 == 0 else False for i in numbers])


"""print(mod_batch(5, 8, 3))"""
