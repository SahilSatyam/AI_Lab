#Camel Banana Problem
n=int(input('total bananas: '))
distance=int(input('Distance: '))
c=int(input('capacity: '))
t = int(n/c)
travel = 0
for i in range(1,t+1):
    travel = travel + (c/((2*i) - 1))
    
start = int(travel - 1000)
print('bananas left :',start)